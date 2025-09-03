export function isAdmin(req, res, next) {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    next();
}