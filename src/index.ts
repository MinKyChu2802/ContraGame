import express from "express";
import cors from "cors";
import router from "./routes/userRouter";
import routerAuthen from "./routes/signInRouter";
import mapRouter from "./routes/mapRouter";
import characterRouter from "./routes/characterRouter";
import bulletRouter from "./routes/bulletRouter";
import sequelize from "./configDB";

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// middleware
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// routers
app.use("/api", router);
app.use("/api", routerAuthen);
app.use("/api", mapRouter);
app.use("/api", characterRouter);
app.use("/api", bulletRouter);

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Tables created successfully.");
  })
  .catch((error) => {
    console.error("Unable to create tables: ", error);
  });

//port
const PORT = process.env.PORT || 4000;

//serve

app.listen(PORT, () => console.log("server is runing", PORT));
