import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ msg: "User doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' })
        }

        const token = jwt.sign({ email: user.email, id: user._id }, 'test', {
            expiresIn: '1h',
        })
        res.status(200).json({ result: user, token })
    } catch (error) {
        res.status(500).json({ msg: 'Server error' })
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body

    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: 'User already exists' })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ msg: 'Passwords do not match' })
        }
        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
        })

        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            'test',
            { expiresIn: '1h' }
        )

        res.status(200).json({ result: newUser, token })
    } catch (error) {
        res.status(500).json({ msg: 'Server error' })
    }
}
