# Stockholm Tour Stats Tracker Dashboard 🗺️

This project is a **personal dashboard** for tracking walking tours I give in Stockholm as a free tour guide.

It allows me to:
- Log details of each tour (type, date, weather, group size, etc.)
- Privately record the money collected per tour
- Compute a **score** based on donations per person (0–10 scale)
- View charts and stats like tour popularity, average scores, weather effects, and more
- Edit or delete entries if I made a mistake

---

## ⚙️ Built With

This project was entirely created using [**Lovable.dev**](https://lovable.dev) — a no-code builder that uses Supabase as a backend and generates React code.

> 🛠️ **Note:** I did not hand-code this project.  
> It was generated with Lovable.dev and exported for portfolio/demo purposes.

---

## 🔒 Score System for Privacy

To avoid showing real money amounts publicly, the project includes a **private "Money Collected (SEK)"** field which is never shown in the UI.  
Instead, it calculates a **score** from 0 to 10 based on the average amount collected per person. 
This allows me to analyze and visualize data without exposing sensitive values.

---

## 📊 Features

- Add/edit/delete tour entries
- Track both **Free Tours** and **Private Tours**
- Dashboard with:
  - Score trends over time
  - Tour type & weather impact
  - Group size analysis
  - Tour category distribution