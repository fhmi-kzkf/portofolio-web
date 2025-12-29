# How to Add Project Images

To add custom covers/screenshots to your projects:

1.  **Create your Image**:
    *   Take a screenshot or design a cover (Recommended size: 800x600px or 16:9 ratio).
    *   Save it as a `.png` or `.jpg`.

2.  **Save the file**:
    *   Place the file in this folder: `public/projects/`
    *   Example: `public/projects/datanest.png`

3.  **Update the Code**:
    *   Open `components/projects-section.tsx`
    *   Find your project in the `projects` list.
    *   Update the `image` field:
    ```typescript
    {
      id: 6,
      title: 'DataNest...',
      // Update this line:
      image: '/projects/datanest.png', 
      ...
    }
    ```

4.  **Save**: The website will automatically update!
