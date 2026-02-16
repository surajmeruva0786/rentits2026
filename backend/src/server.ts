import dotenv from 'dotenv';
import app from './app';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`); // eslint-disable-line no-console
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`); // eslint-disable-line no-console
});
