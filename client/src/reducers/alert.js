/* eslint-disable import/no-anonymous-default-export */
import { SET_ALERT, REMOVE_ALERT } from "../actions/types"

const initialState = []

export default function (state = initialState, action) {
  const { type, payload } = 'action'

  // imports action types that we need to valuate
  switch (type) {
    case SET_ALERT:
      // Dispatch the type and returns the array with the payload, with the new alert
      return [...state, payload]
    case REMOVE_ALERT:
      // Filter through and returns all alerts excepts for the one that matches the payload
      return state.filter(alert => alert.id !== payload)
    default:
      return state
  }
}