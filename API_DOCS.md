# API Documentation

## Overview
FitTrack uses a service-based architecture for data management. All business logic is encapsulated in service classes for maintainability and reusability.

## Authentication Service (AuthContext)

### Methods

#### `login(email, password)`
Authenticates user credentials and manages login state.
- **Parameters**: 
  - `email` (string): User email address
  - `password` (string): User password
- **Returns**: `{success: boolean, message?: string}`

#### `register(userData)`
Creates new user account with profile information.
- **Parameters**:
  - `userData` (object): User registration data
- **Returns**: `{success: boolean, message?: string}`

#### `logout()`
Clears user session and authentication state.
- **Returns**: `Promise<void>`

## Water Tracking Service

### Methods

#### `getWaterConsumption(userId)`
Retrieves current daily water consumption for user.
- **Parameters**: 
  - `userId` (string): User identifier
- **Returns**: `Promise<number>` - Water amount in liters

#### `updateWaterConsumption(userId, amount)`
Updates daily water consumption by adding specified amount.
- **Parameters**:
  - `userId` (string): User identifier  
  - `amount` (number): Water amount to add in liters
- **Returns**: `Promise<number>` - New total amount

#### `resetWaterConsumption(userId)`
Resets daily water consumption to zero.
- **Parameters**:
  - `userId` (string): User identifier
- **Returns**: `Promise<void>`

## Workout Service

### Methods

#### `getAllPrograms(userId)`
Retrieves all workout programs for user.
- **Parameters**:
  - `userId` (string): User identifier
- **Returns**: `Promise<Array<WorkoutProgram>>`

#### `createProgram(userId, programData)`
Creates new workout program.
- **Parameters**:
  - `userId` (string): User identifier
  - `programData` (object): Program details
- **Returns**: `Promise<WorkoutProgram>`

#### `addExerciseToProgram(userId, programId, exerciseData)`
Adds exercise to existing program.
- **Parameters**:
  - `userId` (string): User identifier
  - `programId` (string): Program identifier
  - `exerciseData` (object): Exercise details
- **Returns**: `Promise<Exercise>`

#### `updateExerciseInProgram(userId, programId, exerciseId, exerciseData)`
Updates existing exercise in program.
- **Parameters**:
  - `userId` (string): User identifier
  - `programId` (string): Program identifier
  - `exerciseId` (string): Exercise identifier
  - `exerciseData` (object): Updated exercise data
- **Returns**: `Promise<Exercise>`

#### `removeExerciseFromProgram(userId, programId, exerciseId)`
Removes exercise from program.
- **Parameters**:
  - `userId` (string): User identifier
  - `programId` (string): Program identifier
  - `exerciseId` (string): Exercise identifier
- **Returns**: `Promise<void>`

#### `deleteProgram(userId, programId)`
Deletes entire workout program.
- **Parameters**:
  - `userId` (string): User identifier
  - `programId` (string): Program identifier
- **Returns**: `Promise<void>`

## Data Models

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  birthDate?: string;
  height?: number;
  weight?: number;
  goal?: string;
}
```

### WorkoutProgram
```typescript
interface WorkoutProgram {
  id: string;
  name: string;
  type: string;
  difficulty: string;
  frequency: string;
  exercises: Exercise[];
}
```

### Exercise
```typescript
interface Exercise {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}
```