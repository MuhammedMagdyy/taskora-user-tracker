# Taskora User Tracker 🚀

![NodeJS](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff)
![Redis](https://img.shields.io/badge/Redis-%23DD0031.svg?logo=redis&logoColor=white)

---

## Project Overview 🌟

This is a Node.js script digital growth radar, keeping a passionate eye on new user registrations and celebrating every single new member of the Taskora community. 🎉

---

## Features 🚀

- **Automated User Monitoring**: Checks for new users every 1 hour 👀
- **Email Notifications**: Sends stylized email alerts when new users register 📧
- **Database Integration**: Connects with MySQL to query user data 💾
- **State Management**: Utilizes Redis to track user count changes 🔄
- **Logging**: Comprehensive logging system using Winston for better debugging and monitoring 📜
- **Type Safety**: Built with TypeScript for better code quality and maintainability 🔒

---

## How It Works 🔍

1. The application establishes connections with MySQL and Redis on startup 🌐
2. A cron job springs into action every hour, hunting for new users ⏰
3. Compares the current user count with the previously stored count 🧮
4. Triggers an email notification when new users are discovered 📬
5. Updates the user count in Redis, ready for the next check 🔁

---

## Upcoming Features 🔮

- Discord Integration 🤖
  - Real-time user registration announcements in a specific Discord server

---

## Contributing 🤝

**Found a bug?** Have an idea for a new feature? Contributions are welcome! 💡

1. **Fork the repository** 🚀
2. **Create a new branch** `git checkout -b feature/awesome-feature` 🌟
3. **Commit your changes** `git commit -m 'Add some awesome feature'` 🔥
4. **Push to your branch** `git push origin feature/awesome-feature` 🚀
5. **Create a Pull Request** 🎉

---

**Happy Coding!** 🚀
