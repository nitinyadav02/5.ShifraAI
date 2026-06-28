import { getUserById, updateUserById } from "../Configs/fallbackStore.js"

export const getCurrentUser = async (req,res) => {
    try {
        const user = await getUserById(req.userId)
        if(!user){
            return res.status(404).json({message:"Failed to get current user"})
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
         return res.status(500).json({message:`getCurrentUser error ${error}`})
    }
}


export const saveAssistant = async (req,res) => {
    try {
        const {
        assistantName,
        businessName,
        businessType,
        businessDescription,
        tone,
        theme,
        geminiApiKey,
        pages,
        } = req.body

        const user = await getUserById(req.userId)
        if(!user){
            return res.status(404).json({message:"Failed to get current user"})
        }
        const updatedUser = await updateUserById(req.userId, {
            assistantName,
            businessName,
            businessType,
            businessDescription,
            tone,
            theme,
            geminiApiKey: geminiApiKey || user.geminiApiKey || "",
            geminiStatus: "active",
            pages: pages || [],
            isSetupComplete: true,
        })

        return res.status(200).json({ message:
          "Assistant saved successfully",
        user: updatedUser})
    } catch (error) {
        return res.status(500).json({message:`failed to save Assistant ${error}`})
    }
}

