# Memory Game

Welcome to my Memory Game - inspired by the Maven encounter in the renowned ARPG game Path of Exile. My game is a simple and engaging game built with React Native where the player must remember and replicate the order in which the circle's slices flash purple.

## Table of Contents

- [Overview](#overview)
- [Gameplay](#gameplay)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Backend Development](#backend-development)

## Overview

This project is built using React Native, Expo Router, and Java Spring Boot. The game utilizes SVGs to create a circle with slices and combines them with animations to provide an interactive and fun experience.

## Gameplay

- **Objective**: Remember the sequence in which the circle's slices flash purple.
- **Time Limit**: You have five seconds to complete the sequence.
- **Penalty**: Pressing a wrong slice results in a 1-second penalty.
- **Game Over**: If the timer reaches zero, the player loses.
- **Restart**: Players can quickly start over or select a new difficulty level after losing.

## Features

- (Frontend) React Native and Expo Router integration
- (Backend) Java Spring Boot and an H2 database
- SVG-based game design with animations
- Time-based gameplay with penalties for mistakes
- Difficulty selection for varying challenges

## Installation

To get started with the Memory Circle Game, follow these steps:

### Frontend Setup

1. **Clone the repository**
   ```sh
   git clone https://github.com/maek95/react-native-memory-game-Java-SpringBoot.git
   cd react-native-memory-game-Java-SpringBoot
   ```

2. **Navigate to the frontend directory**
   ```sh
   cd ./frontend/
   ```

3. **Install dependencies**
   ```sh
   npm install
   ```
   or
   ```sh
   npx expo install
   ```

4. **Start the development server**
   ```sh
   npx expo start
   ```

### Backend Setup

1. **Navigate to the backend directory**
   ```sh
   cd ./demo/
   ```

2. **Open the project in your preferred IDE**
   Open the backend directory in your preferred Java IDE, such as IntelliJ IDEA, Eclipse, or Visual Studio Code.

3. **Run the application**
   Locate the main application class (including the @SpringBootApplication annotation): DemoApplication.java
   Right-click on DemoApplication.java and select Run Java or the equivalent run option in your IDE.

### Backend Setup (Maven)

1. **Navigate to the backend directory**
   ```sh
   cd ./demo/
   ```

2. **Install dependencies**: Ensure you have Maven installed.
   ```sh
   mvn clean install
   ```

3. **Start the backend server**
   ```sh
   mvn spring-boot:run
   ```

## Usage

1. **Run the app**: After starting the development server, use the Expo Go app on your virtual device/mobile device to scan the QR code and run the game.
2. **Play the game**: Follow the on-screen instructions to play the game and test your memory skills.
3. **Change difficulty**: Select different difficulty levels to challenge yourself further.

## Backend Development

The backend is powered by Java Spring Boot and allows the user to create an account to keep track of highscores (stored in H2) using JPA repository for data persistence. Currently data is deleted on restarting the backend.

Work in progress:

- Further enhance the backend by building an SQL-database. Supposedly easy to implement if I use PostgreSQL since H2 follows similar structure?
- Potentially let the user add custom difficulties.

Stay tuned for updates!
