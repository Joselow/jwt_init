const register = (req, res) => {
  try { 
    const { username, email, passwords } = req.body
    return res.json({
      ok: true,
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Internal error server'
    })
  }
}

const login = (req, res) => {
  try {
    
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Internal error server'
    })
  }
}

export {
  login, register
}