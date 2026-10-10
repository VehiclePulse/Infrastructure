// init-db.js
db = db.getSiblingDB('vehicle_db');

// ==================================================
// 1. VEHICLES COLLECTION SETUP WITH ALL ORIGINAL INDEXES
// ==================================================
db.createCollection('vehicles', {
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "required": ["_id", "registration_number", "make", "model", "year", "simulation"],
            "properties": {
                "_id": {
                    "bsonType": ["binData", "string"],
                    "description": "Must be a valid UUID or Unique String Identifier"
                },
                "registration_number": {
                    "bsonType": "string",
                    "pattern": "^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}",
                    "description": "Must be a valid registration number"
                },
                "make": {
                    "bsonType": "string",
                    "description": "Must be a string"
                },
                "model": {
                    "bsonType": "string",
                    "description": "Must be a string"
                },
                "year": {
                    "bsonType": "int",
                    "minimum": 1900,
                    "maximum": 9999,
                    "description": "Must be between 1900 and current year"
                },
                "simulation": {
                    "bsonType": "object",
                    "required": ["enabled", "initial_latitude", "initial_longitude", "initial_heading"],
                    "properties": {
                        "enabled": { 
                            "bsonType": "bool",
                            "description": "Must be a true/false boolean value"
                        },
                        "initial_latitude": { 
                            "bsonType": "double",
                            "minimum": -90.0,
                            "maximum": 90.0,
                            "description": "Must be a high-precision float (Double) representing latitude"
                        },
                        "initial_longitude": { 
                            "bsonType": "double",
                            "minimum": -180.0,
                            "maximum": 180.0,
                            "description": "Must be a high-precision float (Double) representing longitude"
                        },
                        "initial_heading": { 
                            "bsonType": "double",
                            "minimum": 0.0,
                            "maximum": 360.0,
                            "description": "Must be a float (Double) compass heading between 0 and 360 degrees"
                        }
                    }
                }
            }
        }
    }
});

// All of your original indexes preserved exactly as written:
db.vehicles.createIndex({"registration_number": 1}, {unique: true});
db.vehicles.createIndex({"_id": 1});
db.vehicles.createIndex({"simulation.enabled": 1});


// ==================================================
// 2. TELEMETRY COLLECTION SETUP WITH ALL ORIGINAL INDEXES
// ==================================================
db.createCollection('telemetry', {
  "validator": {
    "$jsonSchema": {
      "bsonType": "object",
      "required": [
        "_id", "registration_number", "latitude", "longitude", "speed", 
        "heading", "fuel_level", "engine_temperature", "battery_level", 
        "tire_pressure", "last_updated_at"
      ],
      "properties": {
        "_id": { "bsonType": ["binData", "string"] },
        "registration_number": { 
          "bsonType": "string",
          "pattern": "^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$",
          "description": "Must match a valid registration number format"
        },
        "latitude": { "bsonType": "double", "minimum": -90.0, "maximum": 90.0 },
        "longitude": { "bsonType": "double", "minimum": -180.0, "maximum": 180.0 },
        "speed": { "bsonType": "double", "minimum": 0.0 },
        "heading": { "bsonType": "double", "minimum": 0.0, "maximum": 360.0 },
        "fuel_level": { "bsonType": "double", "minimum": 0.0, "maximum": 100.0 },
        "engine_temperature": { "bsonType": "double" },
        "battery_level": { "bsonType": "double" },
        "tire_pressure": {
          "bsonType": "object",
          "required": ["front_left", "front_right", "rear_left", "rear_right"],
          "properties": {
            "front_left": { "bsonType": "double" },
            "front_right": { "bsonType": "double" },
            "rear_left": { "bsonType": "double" },
            "rear_right": { "bsonType": "double" }
          }
        },
        "last_updated_at": { 
          "bsonType": "string", 
          "description": "ISO 8601 date-time string layout" 
        }
      }
    }
  }
});

// All of your original indexes preserved exactly as written:
db.telemetry.createIndex({"_id": 1});
db.telemetry.createIndex({"registration_number": 1});
db.telemetry.createIndex({"last_updated_at": -1});
