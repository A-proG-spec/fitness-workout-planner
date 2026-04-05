/**
 * Admin authorization middleware
 * Must be used after protect middleware
 */
export const adminOnly = async (req, res, next) => {
    try {
        if (!req.user) {
            const error = new Error('Not authorized');
            error.statusCode = 401;
            throw error;
        }

        if (req.user.role !== 'admin') {
            const error = new Error('Access denied. Admin only.');
            error.statusCode = 403;
            throw error;
        }

        next();
    } catch (err) {
        next(err);
    }
};

/**
 * Check if user has admin or moderator role
 */
export const adminOrModerator = async (req, res, next) => {
    try {
        if (!req.user) {
            const error = new Error('Not authorized');
            error.statusCode = 401;
            throw error;
        }

        if (req.user.role !== 'admin' && req.user.role !== 'moderator') {
            const error = new Error('Access denied. Admin or moderator only.');
            error.statusCode = 403;
            throw error;
        }

        next();
    } catch (err) {
        next(err);
    }
};