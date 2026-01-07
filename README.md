# 🥘 Food Copilot

An AI-native ingredient copilot that helps users **see what ingredients are doing**.

Food Copilot is NOT a nutrition app, scorecard, or food judge.  
It is a calm, thinking assistant that reduces cognitive effort while reading ingredient lists.

---

## Problem

Ingredient lists are readable but not understandable.
People don’t know what ingredients *do*.

---

## Solution

Food Copilot converts ingredient lists into **simple physical metaphors**:

- Sugar → sugar cubes in a glass
- Butter → a melted puddle
- Emulsifiers → glue holding oil and water

No judgment. No advice. Just clarity.

---

## Features

- 📸 Image → Ingredient extraction
- 🧠 Ingredient explanations via metaphors
- ⚠️ Conditional allergen questions
- 🧩 Learns user preferences
- 🎯 Intent-based insight (not recommendations)

---

## Tech Stack

- React + Vite
- Tailwind CSS
- Claude (Anthropic API)
- Local preference memory

---

## Setup

```bash
git clone https://github.com/lakshyahai/food-copilot
cd food-copilot
npm install
cp .env.example .env
npm run dev
