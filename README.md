# Umamusume Link Manager

A Node.js script to manage junction links for Umamusume game data directories.

## Requirements

- Node.js installed on your system
- Windows operating system
- Administrator privileges (required for `mklink` command)

## Installation

1. Make sure Node.js is installed on your system. Download it from [nodejs.org](https://nodejs.org/).
2. Download this repo [Link](https://github.com/alt3ri/UmaLink/archive/refs/heads/master.zip) or clone it using Git:
   ```bash
   git clone https://github.com/alt3ri/UmaLink
   ```
3. Extract the downloaded zip file or navigate to the cloned repository directory.
4. Open a terminal or command prompt in the repository directory.
5. Install the required dependencies by running:
   ```bash
   npm install
   ```
6. Launch JP/GL client, make sure you are able to get in to the lobby, then copy Umamusume JP/GL from `C:\Users\YourPCUserName\AppData\LocalLow\Cygames\Umamusume` to `E:\\UmaJP\\Umamusume`/`E:\\UmaGL\\Umamusume`
7. Ensure you have administrator privileges to run the script, as it requires permissions to create symbolic links.
   ```
   node link.js
   ```

```
> node link
Umamusume link...

==================================================
Umamusume Link Manager
==================================================

Select an option:
1. Global - Link to E:\Umamusume
2. Japan - Link to E:\UmaJP\Umamusume_data
3. Exit

==================================================

Enter your choice (1, 2, or 3):
```
