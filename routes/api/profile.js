const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator')

// @route   GET /api/profile/me
// @desc    Get current user profile
// @access  Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
    // .populate() adds the name and avatar to the user collection model
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user.' })
    }
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST /api/profile
// @desc    Create or update user profile
// @access  Private

router.post('/', [
  check('status', 'Status is required').not().isEmpty(),
  check('skills', 'Skills are required').not().isEmpty()
], auth, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body

  // Build profile object
  const userProfile = {}
  userProfile.user = req.user.id
  if (company) userProfile.company = company
  if (website) userProfile.website = website
  if (location) userProfile.location = location
  if (bio) userProfile.bio = bio
  if (status) userProfile.status = status
  if (githubusername) userProfile.githubusername = githubusername
  if (skills) { userProfile.skills = skills.split(',').map(skill => skill.trim()) }

  // Build social object
  userProfile.social = {}
  if (youtube) userProfile.social.youtube = youtube
  if (facebook) userProfile.social.facebook = facebook
  if (twitter) userProfile.social.twitter = twitter
  if (instagram) userProfile.social.instagram = instagram
  if (linkedin) userProfile.social.linkedin = linkedin
  if (youtube) userProfile.social.youtube = youtube

  try {
    let profile = await Profile.findOne({ user: req.user.id })
    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: userProfile },
        { new: true }
      )
      return res.json(profile)
    }
    profile = new Profile(userProfile)
    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   GET /api/profile
// @desc    Get all profiles
// @access  Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    // .populate() adds the name and avatar to the User collection model
    res.json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   GET /api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
    // .populate() adds the name and avatar to the User collection model

    // If the user id is valid but there is not profile for this user
    if (!profile) return res.status(400).json({ msg: 'There is no profile for this user.' })
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    if (err.kind == 'ObjectId') { // If the user id is not valid (ex: more length characters)
      return res.status(400).json({ msg: 'There is no profile for this user.' })
    }
    res.status(500).send('Server Error')
  }
})

// @route   DELETE /api/profile
// @desc    Delete profile, user & posts
// @access  Private

router.delete('/', auth, async (req, res) => {
  try {
    // TODO - Remove users posts

    // Remove profile

    await Profile.findOneAndRemove({ user: req.user.id })
    // user.id is given by auth
    // pass the x-auth-token in headers

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id })

    res.json({ msg: 'Profile and User deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   PUT /api/profile/experience
// @desc    Add profile experience
// @access  Private

router.put('/experience', [auth, [
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }
  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = req.body
  const updatedExp = {
    title, // same as title: title
    company,
    location,
    from,
    to,
    current,
    description
  }
  try {
    // First fetch updatedExp user with the user in database
    const profile = await Profile.findOne({ user: req.user.id })
    // Update profile experience
    profile.experience.unshift(updatedExp)
    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route   DELETE /api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    // NOTE Study remove index
    const profile = await Profile.findOne({ user: req.user.id })
    // Get remove index
    const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)
    profile.experience.splice(removeIndex, 1)
    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
