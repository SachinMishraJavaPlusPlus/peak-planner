import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { FRONTEND_URL } from "./constants";
import axios from "axios";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import path from "path";
import fs from "fs/promises";
import * as csv from 'csv-parse';
import { GoogleGenerativeAI } from "@google/generative-ai";
import connectDB from './config/db.js';
import errorHandler from './middleware/error.js';
import authRoutes from './routes/authRoutes.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

// AdminJS imports
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSMongoose from '@adminjs/mongoose';
import mongoose from 'mongoose';
import User from "./models/User.js";

// Apply stealth plugin
puppeteer.use(StealthPlugin());

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get("/", (req, res) => {
  res.send("SERVER IS RUNNING");
});

app.use(errorHandler);

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database
});

const adminOptions = {
  resources: [User], // Add models here
  rootPath: '/admin',
  branding: {
    companyName: 'Trek Advisor',
  },
};

const admin = new AdminJS(adminOptions);

const router = AdminJSExpress.buildRouter(admin);
app.use(admin.options.rootPath, router);

app.get("/api/trek/:trek_name", async (req, res) => {
  const { trek_name } = req.params;

  try {
    // Normalize the trek name by replacing hyphens with spaces and fixing case
    const normalizedTrekName = trek_name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    // Read and parse the CSV file with trek descriptions
    const descriptionCsvPath = path.join(__dirname, 'client_trek_description.csv');
    const descriptionContent = await fs.readFile(descriptionCsvPath, 'utf-8');
    
    const descriptionParser = csv.parse(descriptionContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    const descriptionRecords = [];
    for await (const record of descriptionParser) {
      descriptionRecords.push(record);
    }

    // Filter records based on normalized trek name
    const filteredTreks = descriptionRecords.filter(record => 
      record["Trek Name"].toLowerCase() === normalizedTrekName.toLowerCase()
    );

    if (filteredTreks.length === 0) {
      return res.status(404).json({ error: "Trek not found" });
    }

    // Get trek data from the filtered results
    const trekData = filteredTreks[0];

    // Read and parse the Trek_Links.csv file
    const linksCsvPath = path.join(__dirname, 'Trek_Links.csv');
    const linksContent = await fs.readFile(linksCsvPath, 'utf-8');
    
    const linksParser = csv.parse(linksContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    const linksRecords = [];
    for await (const record of linksParser) {
      linksRecords.push(record);
    }

    // Find the trek in the links CSV
    const trekLinks = linksRecords.find(record => 
      record["Trek"].toLowerCase() === normalizedTrekName.toLowerCase()
    );

    if (!trekLinks) {
      return res.status(404).json({ error: "Trek links not found" });
    }

    // Define the websites with their additional information
    const websites = [
      {
        name: "India Hikes",
        column: "IndiaHikes",
        Avg_batch_size: "20-25",
        Guide_to_trekker_ratio: "1:10",
        Rentals: "Microspikes included, rest not included in price but are Available"
      },
      {
        name: "Trekkers of India",
        column: "Trekkers of India",
        Avg_batch_size: "15-20",
        Guide_to_trekker_ratio: "1:10",
        Rentals: "Microspikes included, rest not included in price but are Available"
      },
      {
        name: "Trek The Himalayas",
        column: "Trek The Himalayas",
        Avg_batch_size: "25-30",
        Guide_to_trekker_ratio: "1:8",
        Rentals: "Microspikes included, rest not included in price but are Available"
      },
      {
        name: "The Searching Souls",
        column: "The Searching Souls",
        Avg_batch_size: "25-30",
        Guide_to_trekker_ratio: "1:6",
        Rentals: "Microspikes included, rest not included in price but are Available"
      },
      {
        name: "Trek up India",
        column: "Trekup India",
        Avg_batch_size: "20-25",
        Guide_to_trekker_ratio: "1:8",
        Rentals: "Microspikes included, rest not included in price but are Available"
      },
      {
        name: "Himalayan Hikers",
        column: "Himalayan Hikers",
        Avg_batch_size: "25-30",
        Guide_to_trekker_ratio: "1:8",
        Rentals: "Microspikes included, rest not included in price but are Available"
      },
      {
        name: "Traveloft India",
        column: "Traveloft",
        Avg_batch_size: "15-20",
        Guide_to_trekker_ratio: "1:10",
        Rentals: "Microspikes included, rest not included in price but are Available"
      }
    ];

    // Create response data by combining trek data with website information
    const responseData = websites.map(site => {
      const link = trekLinks[site.column];
      return {
        website: link && link.toLowerCase() !== "n/a" ? link : null,
        website_name: site.name,
        trekData: trekData,
        Avg_batch_size: site.Avg_batch_size,
        Guide_to_trekker_ratio: site.Guide_to_trekker_ratio,
        Rentals: site.Rentals
      };
    });

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the data" });
  }
});

app.get("/api/search-treks", async (req, res) => {
  try {
    const { trek, destination, daysRange, difficulty, season } = req.query;
    
    // Read the CSV file
    const csvFilePath = path.join(__dirname, 'client_trek_description.csv');
    const fileContent = await fs.readFile(csvFilePath, 'utf-8');
    
    // Parse CSV with proper configuration
    const parser = csv.parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

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
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Context prompt to ensure trek-related responses
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
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`);
});

export default app;
