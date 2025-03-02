import app from './app';
import dotenv from 'dotenv';
import notificationService from "./services/NotificationService";
import logObserver from "./services/LogObserver";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

notificationService.addObserver(logObserver);
