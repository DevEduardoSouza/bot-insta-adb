---

# Instagram Automation Project

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.0+-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-12+-green.svg)](https://nodejs.org/)

This project is an educational initiative aimed at automating specific actions on Instagram using **ADB (Android Debug Bridge)** and **TypeScript**. It is currently a work-in-progress but already includes functionalities such as logging in and performing basic interactions on the platform.

---

## Features

- **Login Automation**: Automates the login process using stored user credentials.
- **Explore Tab Search**: Performs searches in the Instagram Explore tab and interacts with search results.
- **ADB Integration**: Leverages Android Debug Bridge for device interaction and automation.
- **TypeScript**: Built with TypeScript for type safety and maintainability.
- **Modular Structure**: Organized into reusable modules for commands, tools, utilities, and services.

---

## Project Structure

The project is structured as follows:

- **`app.ts`**: The entry point of the application, handling initialization and the main workflow.
- **`commands/`**: Contains functions for interacting with the device, such as clicking elements, typing text, and capturing screenshots.
- **`tools/`**: Implements higher-level functionalities, such as logging into Instagram and searching in the Explore tab.
- **`utils/`**: Provides utility functions like sleeping, killing the ADB server, and parsing XML bounds.
- **`config/`**: Contains configuration files for setting up device IDs, paths, and other settings.
- **`data/`**: Stores user data for logging into Instagram.
- **`services/`**: Includes services such as the ADB client.

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/DevEduardoSouza/adb-insta-ts.git
   cd adb-insta-ts
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up configuration**:
   - Create a `config/config.ts` file with the necessary configurations (e.g., device ID, XML dump path, etc.).
   - Example:
     ```typescript
     export const config = {
       deviceId: "your_device_id",
       app: {
         packageName: "com.instagram.android",
         activityName: "com.instagram.mainactivity.MainActivity",
       },
     };
     ```

4. **Add user credentials**:
   - Create a `data/user.ts` file with your Instagram account credentials.
   - Example:
     ```typescript
     export const user = {
       username: "your_username",
       password: "your_password",
     };
     ```

---

## Usage

To run the automation script, execute the following command:

```bash
npm run dev
```

### Example Workflow

Here’s an overview of the automation workflow as defined in `app.ts`:

1. Initialize and configure the ADB server.
2. Open the Instagram app on the connected device.
3. Perform login using stored credentials.
4. Search in the Explore tab and interact with search results.

```typescript
async function init() {
  try {
    await killAdbServer();
    const devices = await listDevices(client);

    if (devices.length === 0) {
      console.log("No devices found. Please connect a device and try again.");
      return;
    } else {
      config.deviceId = devices[0].id;
    }

    await openApp({
      packageName: config.app.packageName,
      activityName: config.app.activityName,
    });

    await sleep(2000);
    await login(user);

    await sleep(2000);
    await searchInExplore("#casa");
  } catch (error) {
    console.error("Error:", error);
  }
}

init();
```

---

## Current Functionalities

- **Login**: Automates the login process using stored user credentials.
- **Explore Tab Search**: Performs a search in the Instagram Explore tab and interacts with search results.
- **Device Interaction**: Clicks elements, types text, and captures screenshots using ADB commands.

---

## Contributing

Contributions are welcome! If you’d like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please ensure your code follows the project’s coding standards and includes appropriate documentation.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

## Contact

If you have any questions, suggestions, or feedback, feel free to reach out:

- **Eduardo Souza** - [GitHub](https://github.com/DevEduardoSouza) 

---
