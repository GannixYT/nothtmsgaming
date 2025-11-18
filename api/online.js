let onlineUsers = new Set();

export default function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  onlineUsers.add(ip);

  // Remove inactive IPs after 30 seconds
  setTimeout(() => onlineUsers.delete(ip), 30000);

  res.status(200).json({ online: onlineUsers.size });
}
