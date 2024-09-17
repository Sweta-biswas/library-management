const express= require ("express")
const cors= require ("cors")
const mainRouter= require("./routes/index")
const app= express()
app.use(cors())
app.use(express.json())
app.use("/api/v1",mainRouter)
const port= process.env.PORT || 5000
app.listen(port)