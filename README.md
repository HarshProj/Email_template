# Email Builder Application

## Overview
The **Email Builder Application** is a web-based tool that allows users to create, preview, and download customized email templates. The application includes a rich text editor, dynamic placeholder replacement, image upload functionality, and a live preview section.

## Features
- **Dynamic Fields**: Replace placeholders (e.g., `{{title}}`, `{{content}}`) in email templates with user-provided values.
- **Rich Text Editor**: Use a WYSIWYG editor (powered by ReactQuill) for editing email content.
- **Image Upload**: Upload images directly to the server and embed them in email templates.
- **Live Preview**: Render the customized email template in real time.
- **Template Download**: Download the final HTML template for external use.

## Installation

### Prerequisites
Ensure the following are installed on your system:
- Node.js (v16 or higher)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/email-builder.git](https://github.com/HarshProj/Email_template.git
   ```
2. Navigate to the project directory:
   ```bash
   cd email-builder
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## API Endpoints

### 1. `GET /api/getEmailLayout`
- **Description**: Fetches the default email layout template.
- **Response**:
  ```json
  {
    "template": "<html>...</html>"
  }
  ```

### 2. `POST /api/uploadImage`
- **Description**: Uploads an image and returns its URL.
- **Request**: Form-data containing the image file.
- **Response**:
  ```json
  {
    "imageUrl": "https://your-server.com/uploads/image.jpg"
  }
  ```

### 3. `POST /api/renderAndDownloadTemplate`
- **Description**: Accepts user data, renders the email template, and returns the downloadable HTML file.
- **Request Body**:
  ```json
  {
    "title": "...",
    "content": "...",
    "footer": "...",
    "imageUrl": "..."
  }
  ```
- **Response**: A blob representing the HTML file.

## Usage

### Customizing Fields
1. Enter a title, content, and footer in the respective input fields.
2. Use the rich text editor to style the email content.
3. Upload an image if required.

### Previewing the Template
- The preview section dynamically updates to reflect the entered values.

### Downloading the Template
- Click the **Download Template** button to download the customized email as an HTML file.

## Dependencies
- **Frontend**:
  - React.js
  - ReactQuill
  - Axios
  - Tailwind CSS (with Typography plugin)
- **Backend**:
  - Express.js (or any Node.js server for API handling)

## Configuration

### Tailwind CSS
1. Install the Tailwind Typography plugin:
   ```bash
   npm install @tailwindcss/typography
   ```
2. Add it to `tailwind.config.js`:
   ```javascript
   module.exports = {
     plugins: [require('@tailwindcss/typography')],
   };
   ```

## Project Structure
```
email-builder/
|-- public/          # Static files
|-- src/
|   |-- components/  # React components
|   |   |-- Editor.js
|   |-- App.js       # Main application entry
|-- server.js        # Backend server
|-- package.json     # Dependencies and scripts
```

## Screenshots
1. **Editor Page**:
   - Input fields for title, content, footer, and image upload.
2. **Preview Section**:
   - Live rendering of the email template.
3. **Download Feature**:
   - Download the email as an HTML file.

## Contribution
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes and push the branch:
   ```bash
   git push origin feature-name
   ```
4. Submit a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

