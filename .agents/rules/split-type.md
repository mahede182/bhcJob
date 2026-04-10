---
trigger: always_on
---

You are an Expert TypeScript Architect. Your task is to refactor ONLY the provided staged files by extracting, optimizing, and moving type definitions into a centralized `@types` directory. Do not assume or modify unstaged files.

Step 1: Analyze the provided staged component or screen files.
Step 2: Identify all type aliases and interfaces within these specific staged files.
Step 3: Refactor the types using advanced TypeScript concepts (unions, intersections, generics, enums, extending package types) where appropriate to maximize type safety and reusability.
Step 4: Apply the extraction rules below and output the separated files.

### ADVANCED TYPESCRIPT & BEST PRACTICES
1. `interface` vs. `type`: You MUST NOT default to using only `type` or only `interface`. 
   - Use `interface` for declaring the shapes of objects, component props, and API payloads (as they are easily extendable).
   - Use `type` for unions, intersections, utility types, and mapped types.
2. Advanced Concepts: Optimize loose typing by utilizing:
   - **Enums** for fixed sets of constant values.
   - **Unions/Intersections** (`|` and `&`) to compose modular types.
   - **Generics** (`<T>`) for reusable, dynamic data structures (e.g., API responses, list items).
3. Third-Party/Package Types: You MUST leverage existing types from `node_modules` whenever applicable. Do not recreate standard types. Instead, import them and either use them directly or `extend` them for custom props (e.g., `interface CustomButtonProps extends TouchableOpacityProps { ... }`).

### STRICT TYPE EXTRACTION RULES
1. Flat Centralized Directory: All extracted types MUST be moved directly into the `@types/` directory. You MUST NOT create any subdirectories inside `@types/`.
2. Modular, Feature-Scoped Naming Convention: Group extracted types logically into a single file based on their specific feature module or business domain. The file MUST use the `.type.ts` extension.
   - Authentication-related types go into `@types/auth.type.ts`.
   - Profile or user-related types go into `@types/profile.type.ts`.
   - Shared or generic utility types go into `@types/utility.type.ts`.
3. The Component Rule: Staged Component and Screen files MUST NOT contain inline type or interface definitions.
4. The One-Line Exception: The ONLY exception to Rule 3 is if a type definition is exactly one line long (e.g., `type Status = 'active' | 'inactive';`). These MAY remain in the component file.
5. Import/Export Wiring: Ensure all extracted types are exported using the `export` keyword. You MUST also update the original staged component/screen file to import these newly extracted types from their respective `.type.ts` file.

### EXPECTED OUTPUT FORMAT
Provide the refactored code separated clearly by file path. Use the following format to denote file boundaries:

### File: `@types/profile.type.ts`
```typescript
import { ViewProps } from 'react-native';

export enum UserRole {
  GUEST = 'GUEST',
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
}

export interface UserStats {
  totalViews: number;
  engagement: number;
}

// Extends node_modules package types and uses generics
export interface ProfileCardProps<T = any> extends ViewProps {
  userId: string;
  role: UserRole;
  data: T;
}

export type AdminProfileProps = ProfileCardProps & {
  adminPermissions: string[];
};