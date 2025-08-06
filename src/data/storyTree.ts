//* src/data/storyTree.ts
import { StoryTree } from "../types/scene";

export const storyTree: StoryTree = {
  start: {
    id: "start",
    text: "You wake beneath blood-colored skies, a faint memory whispering through your thoughts.",
    choices: [
      { text: "Stand and look around", nextSceneId: "clearing" },
      { text: "Stay lying down", nextSceneId: "dream" },
    ],
  },
  clearing: {
    id: "clearing",
    text: "Around you, a desolate forest twists in unnatural silence. A path leads north, a flicker of light to the east.",
    choices: [
      { text: "Follow the path north", nextSceneId: "chapel" },
      { text: "Investigate the flicker", nextSceneId: "fire" },
    ],
  },
  dream: {
    id: "dream",
    text: "Shadows slip into your mind. You dream of a woman with black eyes and a silver crown whispering your name.",
    choices: [
      { text: "Reach toward her", nextSceneId: "mirror" },
      { text: "Wake up", nextSceneId: "clearing" },
    ],
  },
  fire: {
    id: "fire",
    text: "A campfire burns unattended. On a log sits a journal, pages fluttering in a windless breeze.",
    choices: [
      { text: "Read the journal", nextSceneId: "journal" },
      { text: "Extinguish the fire", nextSceneId: "darkness" },
    ],
  },
  journal: {
    id: "journal",
    text: "'She watches from the chapel.' The rest is scrawled and illegible.",
    choices: [
      { text: "Head to the chapel", nextSceneId: "chapel" },
    ],
  },
  darkness: {
    id: "darkness",
    text: "The fire dies. Something else stirs behind you. You run, blindly.",
    choices: [
      { text: "Keep running", nextSceneId: "ravine" },
    ],
  },
  chapel: {
    id: "chapel",
    text: "A ruined chapel looms. Vines cover broken glass. The door hangs open, dark within.",
    choices: [
      { text: "Enter the chapel", nextSceneId: "altar" },
      { text: "Circle the building", nextSceneId: "backgrave" },
    ],
  },
  mirror: {
    id: "mirror",
    text: "You reach — and fall through silver. You’re no longer yourself.",
    choices: [],
  },
  altar: {
    id: "altar",
    text: "A whisper fills your head: 'Welcome back, prophet.' A hand reaches from the altar.",
    choices: [
      { text: "Take the hand", nextSceneId: "bonded" },
      { text: "Pull away", nextSceneId: "flee" },
    ],
  },
  backgrave: {
    id: "backgrave",
    text: "Behind the chapel, gravestones lean like drunks. One bears your name, freshly carved.",
    choices: [
      { text: "Dig it up", nextSceneId: "hollow" },
    ],
  },
  ravine: {
    id: "ravine",
    text: "You stumble into a ravine. The world spins. From below, red eyes blink open.",
    choices: [],
  },
  bonded: {
    id: "bonded",
    text: "Your hand merges with hers. The chapel brightens. You are no longer alone in your mind.",
    choices: [],
  },
  flee: {
    id: "flee",
    text: "You turn and flee — but the chapel doesn’t let you go. It stretches. It watches.",
    choices: [],
  },
  hollow: {
    id: "hollow",
    text: "Inside the grave is not dirt, but a staircase spiraling down into bone-white light.",
    choices: [
      { text: "Descend", nextSceneId: "mirror" },
    ],
  },
};
