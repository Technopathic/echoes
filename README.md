# Echoes
An interactive character conversationalist application which allows the user to converse with various characters from various universes as AI assistants.

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Schema

* `echoes_users`: Contains user information
    * id: number
    * username: string
    * email: string
    * fullName: string
    * archived: boolean
    * created_at: string
* `echoes_userConversations`: User conversations and Character status based on user interactions
    * id: number
    * slug: string
    * userId: number
    * characterId: number
    * mood: number
    * trust: number
    * archived: boolean
    * created_at: string
* `echoes_history`: Contains conversational history between User,Character, and relevance
    * id: number
    * conversationId: number
    * userInput: string
    * aiResponse: string
    * priority: number
    * created_at: string
* `echoes_characters`: Contains characters and their designated prompts
    * id: number
    * name: string
    * prompt: string
    * image: string
    * archived: boolean

