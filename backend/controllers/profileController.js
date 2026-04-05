import User from '../models/User.js';

const toPositiveNumber = (value) => {
    if (value === undefined || value === null || value === '') return undefined;
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) return null;
    return parsed;
};

const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
};

const calculateBmi = (heightCm, weightKg) => {
    const heightM = heightCm / 100;
    const bmiValue = weightKg / (heightM * heightM);
    const bmi = Number(bmiValue.toFixed(1));

    return {
        bmi,
        category: getBmiCategory(bmi)
    };
};

const buildProfileResponse = (userDoc) => {
    const profile = {
        id: userDoc._id,
        name: userDoc.name,
        email: userDoc.email,
        height: userDoc.height,
        weight: userDoc.weight,
        createdAt: userDoc.createdAt,
        updatedAt: userDoc.updatedAt
    };

    profile.bmi = profile.height && profile.weight
        ? calculateBmi(profile.height, profile.weight)
        : null;

    return profile;
};

export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: buildProfileResponse(user)
        });
    } catch (err) {
        next(err);
    }
};

export const updateProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const numericFields = ['height', 'weight'];
        for (const field of numericFields) {
            if (field in req.body) {
                const parsed = toPositiveNumber(req.body[field]);
                if (parsed === null) {
                    const error = new Error(`${field} must be a positive number`);
                    error.statusCode = 400;
                    throw error;
                }
                user[field] = parsed;
            }
        }

        // Update other allowed fields
        const allowedFields = ['gender', 'dateOfBirth', 'fitnessGoal', 'onboardingCompleted'];
        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                user[field] = req.body[field];
            }
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: buildProfileResponse(user)
        });
    } catch (err) {
        next(err);
    }
};
