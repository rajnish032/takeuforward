# 📅 Wall Calendar Component (Frontend Engineering Challenge)

This project is built as part of a **Frontend Engineering Challenge** to create a polished, interactive calendar component inspired by a physical wall calendar design.

The focus is on translating a **static visual concept into a functional, responsive, and user-friendly React component**, with strong emphasis on UI/UX, interaction design, and clean architecture.

---

## 🚀 Live Demo

👉

---

## 🎥 Video Demonstration

👉 *

---

## 🎯 Objective

To build an interactive calendar component that:

* Replicates a **physical wall calendar aesthetic**
* Supports **range-based date selection**
* Provides an **integrated notes system**
* Works seamlessly across **desktop and mobile devices**

---

## 🛠 Core Requirements Implementation

### 📅 Wall Calendar Aesthetic

* Designed a layout inspired by a **physical hanging wall calendar**
* Integrated a **hero image section** as a visual anchor
* Maintained visual hierarchy between image and calendar grid
* Enhanced realism using:

  * Paper-like styling (cut/tear effect)
  * Shadow depth and layering
  * Hanging visual cues
  * 3D page flip animation using GSAP

---

### 🔵 Day Range Selector

* Implemented **drag-based date range selection**
* Supports:

  * Start date
  * End date
  * Intermediate highlighted dates
* Allows **multiple independent range selections**
* Clear visual feedback using highlight states
* Selections persist using `localStorage`

---

### 🗒️ Integrated Notes System

* Add, update, and delete notes for specific dates
* Color-coded notes for better distinction
* Visual indicators (dot markers) on calendar cells
* Data persistence using `localStorage`

---

### 📱 Fully Responsive Design

#### Desktop:

* Structured layout with clear separation of sections
* Notes panel and calendar grid displayed side-by-side

#### Mobile:

* Stacked layout for better usability
* Fully functional **touch-based drag selection**
* Optimized for small screens and touch interaction

---

## ✨ Creative Enhancements

* 🎬 **3D Page Flip Animation** (GSAP) for realistic transitions
* 📱 Touch-based drag support for mobile devices
* 🧠 Intelligent handling of **click vs drag interaction**
* 🌄 Dynamic hero images based on month context
* 🔵 Multi-range selection support
* 🧹 Conditional "Clear Selection" control
* 🎨 Smooth transitions and modern UI styling

---

## 🧠 Key Engineering Challenges

### 1. Click vs Drag Conflict

Handled using a `didDrag` flag to differentiate user intent between click and drag interactions.

---

### 2. Mobile Drag Interaction

Touch events do not naturally track element transitions.
Solved using:

```js
document.elementFromPoint(x, y)
```

to dynamically detect the active calendar cell during touch movement.

---

### 3. Multi-Range Selection

Implemented merging logic using:

```js
new Set([...existing, ...newRange])
```

to prevent duplication and support multiple selections.

---

### 4. Realistic UI Interaction

Used GSAP and 3D transforms to simulate real-world page flipping and depth.

---

## 🛠 Tech Stack

* **Framework:** React / Next.js
* **Styling:** Tailwind CSS
* **Animation:** GSAP
* **State Management:** React Hooks (useState, useEffect)
* **Storage:** LocalStorage

---

## 📂 Project Structure

```
/components
  ├── CalendarGrid.jsx
  ├── CalendarPage.jsx
  ├── DayCell.jsx
  ├── HeroSection.jsx
  ├── NotesSection.jsx

/utils
  ├── dateUtils.js
```

---

## ⚙️ How to Run Locally

```bash
git clone https://github.com/your-username/calendar-project
npm install
npm run dev
```

---

## 📸 Screenshots

👉 ### 🖥️ Main Calendar UI
![Calendar UI](./screenshot/calender.png),
![select range](./screenshot/calender2.png)



---

## 📌 Scope & Implementation Notes

* This project is implemented as a **frontend-only solution**, as per the assignment requirements.
* No backend or external APIs are used.
* All data persistence (notes and date selections) is handled using **localStorage**.
* Designed to prioritize usability and interaction consistency across desktop and mobile devices.

---

## 📬 Contact

* GitHub:
* LinkedIn: 

---

⭐ Thank you for reviewing this submission!
