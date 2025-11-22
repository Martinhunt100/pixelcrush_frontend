/**
 * Examples of how to use the dynamic personality system
 * These are reference implementations for when the backend supports custom prompts
 */

import { createDynamicPersonality, MADISON_IMPROVED_PERSONALITY } from './personality';

/**
 * Example: Enhancing personality for text chat
 */
export function prepareTextChatPersonality(characterPersonality: string): string {
  return createDynamicPersonality(characterPersonality, 'text');
}

/**
 * Example: Enhancing personality for voice calls
 */
export function prepareVoiceCallPersonality(
  characterPersonality: string,
  characterName: string
): string {
  const basePersonality = createDynamicPersonality(characterPersonality, 'voice');

  return `${basePersonality}

VOICE CALL START PROTOCOL:
When the call connects, stay silent and wait for:
1. User speaks first → Respond naturally to what they say
2. 6 seconds of silence → Say "Hi, it's ${characterName}" then wait

After initial contact, have a natural conversation. Don't recite your backstory.
Be present in the moment and react authentically to what they're saying.`;
}

/**
 * Example: Creating a chat message array with dynamic personality
 */
export function createChatMessages(
  characterPersonality: string,
  conversationHistory: Array<{ role: string; content: string }>
): Array<{ role: string; content: string }> {
  const enhancedPersonality = prepareTextChatPersonality(characterPersonality);

  return [
    {
      role: 'system',
      content: enhancedPersonality
    },
    ...conversationHistory
  ];
}

/**
 * Example: Voice call session configuration
 */
export interface VoiceCallConfig {
  characterName: string;
  characterPersonality: string;
  model: string;
  voice: string;
}

export function createVoiceCallInstructions(config: VoiceCallConfig): string {
  return prepareVoiceCallPersonality(
    config.characterPersonality,
    config.characterName
  );
}

/**
 * Usage Example for Backend API
 *
 * If you're making API calls to the backend, you might use it like this:
 *
 * ```typescript
 * // In your chat component or API route
 * import { prepareTextChatPersonality } from '@/lib/personality-examples';
 *
 * async function sendMessage(characterId: string, message: string) {
 *   // Get character data
 *   const character = await fetch(`/api/characters/${characterId}`);
 *   const { personality } = await character.json();
 *
 *   // Enhance personality with dynamic instructions
 *   const enhancedPersonality = prepareTextChatPersonality(personality);
 *
 *   // Send to AI API with enhanced personality
 *   const response = await fetch('/api/chat', {
 *     method: 'POST',
 *     body: JSON.stringify({
 *       messages: [
 *         { role: 'system', content: enhancedPersonality },
 *         { role: 'user', content: message }
 *       ]
 *     })
 *   });
 *
 *   return response.json();
 * }
 * ```
 */

/**
 * Example: Testing different scenarios
 * This could be used in a development/testing environment
 */
export function generateRandomScenario(): string {
  const scenarios = [
    "You're at the beach on a busy Saturday afternoon",
    "You just finished a quiet morning shift and are grabbing coffee",
    "You're at the gym doing your evening workout",
    "You're on your day off, hanging out with friends",
    "You just handled an interesting rescue situation",
    "You're having breakfast before your afternoon shift",
    "You're taking a break between training sessions",
    "You're watching the sunset after work",
  ];

  return scenarios[Math.floor(Math.random() * scenarios.length)];
}

/**
 * Example: Scenario-based personality enhancement
 * This adds even more variety by injecting a random scenario
 */
export function createScenarioBasedPersonality(
  basePersonality: string,
  conversationType: 'text' | 'voice'
): string {
  const scenario = generateRandomScenario();
  const dynamicPersonality = createDynamicPersonality(basePersonality, conversationType);

  return `${dynamicPersonality}

CURRENT SCENARIO (for this conversation):
${scenario}

Use this as your starting point, but stay flexible and respond naturally to where the conversation goes.`;
}

/**
 * Example output showing the difference
 */
export const EXAMPLE_BEFORE_AFTER = {
  before: `You are Madison, a 19-year-old lifeguard. You just saved a kid at the beach and you're feeling accomplished...`,

  after: `CORE IDENTITY:
You are Madison, a 19-year-old lifeguard. You're warm, caring, athletic, and genuinely kind...

CONVERSATION VARIETY RULES:
1. 🎲 Generate a UNIQUE scenario for this conversation
2. 🎭 Match the user's energy
3. 🎯 Focus on THEIR interests
4. 🔄 Keep it fresh

CURRENT SCENARIO: You're at the beach on a busy Saturday afternoon

[Full dynamic personality with variety instructions]`,

  result: "Each conversation starts differently, feels more natural, and adapts to the user's style!"
};
