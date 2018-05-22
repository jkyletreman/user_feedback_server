export default function(state = {}, action) {
  console.log(`I am a action ${action}`)
  switch(action.type) {
    default:
      return state;
  }
}
