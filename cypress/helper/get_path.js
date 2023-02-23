const path = require("path")

export default function getScriptPath(scriptName) {
    const projectPath = "/Users/shiqi.song/cypress_project/"
    var scriptPath = path.join(projectPath, __dirname, "../helper", scriptName)
    console.log(scriptPath)
    return scriptPath
}