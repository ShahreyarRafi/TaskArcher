# Task Archer - Task Management Platform

Task Archer is a collaborative task management platform. This platform is built with a focus on enhancing and improving task management for users across various professions. The platform provides a responsive and visually appealing user interface, making it accessible from any device.

## Live Demo

Visit the live demo of Task Archer: [Task Archer Live](https://task-archer.web.app/)

## Technologies Used

- Frontend: React.js, React Hook Form
- Backend: Express, Node.js, MongoDB
- Authentication: Firebase Authentication (Google Sign-In)
- Additional Libraries: Framer Motion (optional)

## Project Structure

The project is organized into the following key directories:

- **`src/components`**: Contains React components used throughout the application.
- **`src/pages`**: Houses the main pages of the application, such as the landing page, login page, and task management dashboard.
- **`src/utils`**: Includes utility functions and helper files.
- **`src/styles`**: Holds stylesheets for styling components.

## Features

### 1. Responsive Design

Task Archer provides a device-friendly look and feel, ensuring a seamless user experience across various devices, including phones, tablets, and PCs.

### 2. Landing Page

- Simple navbar with relevant routes.
- Engaging banner with a "Let’s Explore" button redirecting users to the login page.

### 3. User Authentication

- Users can register, log in, and log out.
- Google Sign-In for convenient access.
- Each user has a profile with a profile picture in the task management dashboard.

### 4. Task Management Dashboard

- Users can create tasks with titles, descriptions, deadlines, and priority levels.
- Tasks are organized into three lists: to-do, ongoing, and completed.
- Drag-and-drop functionality allows users to move tasks between lists.
- React Hook Form is used for task creation.
- Users can delete tasks from the dashboard.

### 5. Additional Features

- Toast notifications for task assignments, updates, and deadlines.
- Optional animation library integration (Framer Motion).

### 6. Bonus Feature

- Task editing functionality allows users to edit task details and save changes.

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/ShahreyarRafi/TaskArcher
   ```

2. Install dependencies:

   ```bash
   cd task-archer
   npm install
   ```

3. Run the application:

   ```bash
   npm start
   ```

4. Visit `http://localhost:5000` in your browser to explore Task Archer.

## Contributing

If you'd like to contribute to Task Archer, please follow the [Contributing Guidelines](CONTRIBUTING.md).

## License

Task Archer is licensed under the [MIT License](LICENSE).
