'use strict';

const client = require('../client');

function insertIntoDataBase(city){
  const sql = `INSERT INTO locations (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4)`;
        const safeValues = [city.search_query, city.formatted_query, city.latitude, city.longitude];
  
        client.query(sql, safeValues)
}

module.exports = insertIntoDataBase;