import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { FRONTEND_URL } from "./constants";
import axios from "axios";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import path from "path";
import fs from "fs/promises";
import * as csv from 'csv-parse';
import { GoogleGenerativeAI } from "@google/generative-ai";
import connectDB from './config/db.js';
import errorHandler from './middleware/error.js';
import authRoutes from './routes/authRoutes.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get("/",(req,res)=>{
  res.send("SERVER IS RUNNING");
})

app.use('/api/v1/auth', authRoutes);

app.use(errorHandler);

app.get("/api/trek/:trek_name", async (req, res) => {
  const { trek_name } = req.params;

  try {
    // Normalize the trek name by replacing hyphens with spaces and fixing case
    const normalizedTrekName = trek_name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    // Read and parse CSV file
    const csvFilePath = path.join(__dirname, 'client_trek_description.csv');
    const fileContent = await fs.readFile(csvFilePath, 'utf-8');
    
    const parser = csv.parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    const records = [];
    for await (const record of parser) {
      records.push(record);
    }

    // Filter records based on normalized trek name
    const filteredTreks = records.filter(record => {
      return record["Trek Name"].toLowerCase() === normalizedTrekName.toLowerCase();
    });

    // Add trek data to the scraped results
    const trekData = filteredTreks[0];

    // Define the websites to scrape
    const websites = [
      {
        name: "IndiaHikes",
        domain: "indiahikes.com",
        selectors: {
          info: ".QuickInfoSection_snippetWidgetContainer__iMJMp", // Update with correct selector
          description: ".TrekOverview_readMoreParagraph__H_0qQ", // Update with correct selector
          trek_fee: ".trek_fee"
        },
        Avg_batch_size: "20-25",
        Guide_to_trekker_ratio:"1:10",
        Rentals: "Microspikes included, rest not inciuded in price but are Available"
      },
      {
        name: "TrekkersOfIndia",
        domain: "trekkersofindia.com",
        selectors: {
          info: ".kms", // Update with correct selector
          description: ".overview", // Update with correct selector
          trek_fee: ".price_s", // Update with correct selector
        },
        Avg_batch_size: "15-20",
        Guide_to_trekker_ratio:"1:10",
        Rentals: "Microspikes included, rest not included in price but are Available"
      },
      {
        name: "Trekker The Himalayas",
        domain: "trekthehimalayas.com",
        selectors: {
          info: ".info", // Update with correct selector
          description: ".trekdetails", // Update with correct selector
          trek_fee: "#inr-price", // Update with correct selector
        },
        Avg_batch_size: "25-30",
        Guide_to_trekker_ratio:"1:8",
        Rentals: "Microspikes included, rest not included in price but are Available"
      },
      {
        name: "The Searching Souls",
        domain: "thesearchingsouls.com",
        selectors: {
          info: ".elementor-element-47d3c64", // Update with correct selector
          description: ".elementor-element-b45efef", // Update with correct selector
          trek_fee: ".sale-price", // Update with correct selector
        },
        Avg_batch_size: "25-30",
        Guide_to_trekker_ratio:"1:6",
        Rentals: "Microspikes included, rest not included in price but are Available"
      },
      {
        name: "The Trek Up India",
        domain: "trekupindia.com",
        selectors: {
          info: ".elementor-element-6356c9e9", // Update with correct selector
          description: ".elementor-element-6243e260", // Update with correct selector
          trek_fee: ".elementor-price-table__integer-part", // Update with correct selector
        },
        Avg_batch_size: "20-25",
        Guide_to_trekker_ratio:"1:8",
        Rentals: "Microspikes included, rest not included in price but are Available"
      },
      {
        name: "Himalayan Hikers",
        domain: "himalayanhikers.in",
        selectors: {
          info: ".scroll-description", // Update with correct selector
          description: ".vc_row wpb_row vc_row-fluid", // Update with correct selector
          trek_fee: ".woocommerce-Price-amount", // Update with correct selector
        },
        Avg_batch_size: "25-30",
        Guide_to_trekker_ratio:"1:8",
        Rentals: "Microspikes included, rest not included in price but are Available"
      },
      // {
      //   name: "Traveloft India",
      //   domain: "traveloftindia.com",
      //   selectors: {
      //     info: ".", // Update with correct selector
      //     description: ".LWbAav Kv1aVt", // Update with correct selector
      //     trek_fee: ".", // Update with correct selector
      //   },
      //   Avg_batch_size: "15-20",
      //   Guide_to_trekker_ratio:"1:10",
      //   Rentals: "Microspikes included, rest not included in price but are Available"

      // },
      // Add more websites here as needed
    ];

    // Scrape data from each website
    const scrapedData = await Promise.all(
      websites.map(async (site) => {
        try {
          // Use Bing to search for the trek name and the website domain
          const searchQuery = `${normalizedTrekName} site:${site.domain} website page url no blog url no extra stuff`;
          const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"], // Disable sandboxing
          });
          const page = await browser.newPage();

          console.log(`Navigating to Bing for ${site.name}...`);
          await page.goto(`https://www.bing.com/search?q=${encodeURIComponent(searchQuery)}`, {
            waitUntil: "networkidle2",
          });

          // Wait for the search results to load
          console.log("Waiting for search results...");
          await page.waitForSelector("h2 a", { timeout: 10000 }); // Use "h2 a" for Bing search results

          // Get the URL of the first search result
          console.log("Extracting the first result URL...");
          const firstResultUrl = await page.$eval("h2 a", (el) => el.href);

          console.log("First result URL:", firstResultUrl);

          // Close the browser
          await browser.close();

          if (!firstResultUrl) {
            throw new Error(`No search results found for ${site.name}`);
          }

          // Scrape the trek information from the URL
          const { data } = await axios.get(firstResultUrl);
          const $ = cheerio.load(data);
          const siteData = {
            website: firstResultUrl,
            website_name: site.name,
            info: $(site.selectors.info).text().trim(),
            trekData: trekData, // Use the CSV data instead
            trek_fee: $(site.selectors.trek_fee)?.text().trim() || null,
            Avg_batch_size: site.Avg_batch_size,
            Guide_to_trekker_ratio: site.Guide_to_trekker_ratio,
            Rentals: site.Rentals
          };

          return siteData;
        } catch (error) {
          console.error(`Error scraping ${site.name}:`, error);
          return {
            website: site.name,
            error: "Failed to scrape data",
          };
        }
      })
    );

    res.json(scrapedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while scraping the data" });
  }
});

app.get("/api/search-treks", async (req, res) => {
  try {
    const { trek, destination, daysRange, difficulty ,season} = req.query;
    
    // Read the CSV file
    const csvFilePath = path.join(__dirname, 'client_trek_description.csv');
    const fileContent = await fs.readFile(csvFilePath, 'utf-8');
    
    // Parse CSV with proper configuration
    const parser = csv.parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    console.log(trek);
    const records = [];
    for await (const record of parser) {
      records.push(record);
    }

    // Filter records based on search criteria
    const filteredTreks = records.filter(record => {
      let matches = true;

      if (trek) {
        matches = matches && record["Trek Name"].toLowerCase().includes(trek.toString().toLowerCase());
      }
      if (destination) {
        matches = matches && record["State"].toLowerCase().includes(destination.toString().toLowerCase());
      }
      if (daysRange) {
        // Normalize the days range format
        const recordDaysRange = record["Days Range"].replace(/\s+/g, '');
        matches = matches && recordDaysRange === daysRange.toString().replace(/\s+/g, '');
      }
      if (difficulty) {
        matches = matches && record["Difficulty Level"].toLowerCase() === difficulty.toString().toLowerCase();
      }

      if(season){
        matches = matches && record["Best time to visit"].toLowerCase().includes(season.toString().toLowerCase());
      }

      return matches;
    });

    res.json(filteredTreks);
  } catch (error) {
    console.error('Error searching treks:', error);
    res.status(500).json({ error: "An error occurred while searching treks" });
  }
});

app.get("/api/gemini", async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Context prompt to ensure trek-related responses
    const contextPrompt = `You are a trekking expert who only answers questions related to topics similar to these topics like :-(1. Weather forecast of Himachal Pradesh for the 1st week January
2. Importance of acclimatization before a trek
3. How to deal with AMS?
4. Trekking gears required on a trek
5. Kuari pass trek itinerary
6. Best winter trek for stargazing
7. Best time to do Kashmir Great Lakes trek
8. Essentials to carry on a winter/monsoon Trek
9. Symptoms of AMS
10. Food items to carry on a trek ) in India, 
    particularly about weather conditions, trek preparation, safety, gear requirements, specific trek details, 
    and medical conditions like AMS. If the question is not related to these topics, politely decline to answer 
    and suggest asking about trekking-related topics instead.`;

    const prompt = `${contextPrompt}\n\nQuestion: ${query}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Error with Gemini API:', error);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});