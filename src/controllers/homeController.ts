import { Request, Response } from "express";

export default function getHome(_req: Request, res: Response): void {
  res.setHeader("Content-Type", "text/html");
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>DLSL Student API</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
      <style>
        :root {
          --primary-green: #00834d;
          --light-gray: #f4f7f6;
          --dark-text: #2c3e50;
          --light-text: #5a7184;
        }

        body {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: var(--light-gray);
          color: var(--dark-text);
        }

        .container {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          padding: 30px;
          max-width: 600px;
          width: 90%;
          text-align: center;
          border-top: 4px solid var(--primary-green);
        }

        h1 {
          font-size: 2rem;
          color: var(--primary-green);
          margin-bottom: 10px;
        }

        .subtitle {
          font-size: 1rem;
          color: var(--light-text);
          margin-bottom: 20px;
        }

        .api-info {
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 6px;
          text-align: left;
          margin-top: 20px;
          border-left: 4px solid var(--primary-green);
        }

        code {
          background-color: #e1e8ed;
          border-radius: 4px;
          padding: 2px 5px;
          font-family: 'Courier New', monospace;
        }

        a {
          text-decoration: none;
          color: var(--primary-green);
          font-weight: 600;
        }

        a:hover {
          text-decoration: underline;
        }

        .footer {
          margin-top: 25px;
          font-size: 0.9rem;
          color: #888;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>AnimoDev QOL Backend</h1>
        <p class="subtitle">Log student attendance on events quickly and easily + save to Supabase.</p>

        <div class="api-info">
          <p><strong>Endpoint:</strong> <code>/api/student</code></p>
          <p><strong>Usage:</strong> Add <code>?id=STUDENT_ID&event_code=EVENT_CODE</code> to query.</p>
        </div>

        <div class="api-info">
          <p><strong>Example:</strong> <a href="/api/student?id=2023347381&event_code=TEST2025" target="_blank">/api/student?id=2023347381&event_code=TEST2025</a></p>
        </div>

        <p class="footer">Event code is required!</p>
        <p class="footer">Server is running and ready to accept requests.</p>
      </div>
    </body>
    </html>
  `);
}
