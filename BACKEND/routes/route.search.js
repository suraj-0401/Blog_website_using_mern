import express from "express";
const app=express()

const route=express.Router();

app.get('/search',search);

export default route;

