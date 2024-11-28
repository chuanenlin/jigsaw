# Jigsaw 🧩

Jigsaw is a visual programming interface that allows you to chain together AI models using ✨puzzle pieces✨.

## Features

- **Multimodal 🔤🖼️🎞️🧱🔊🖋️**: Build multimodal AI pipelines using puzzle pieces colored with their input and output modalities.
- **Observe 🔍**: Inspect intermediate results and view model execution progress in real-time.
- **Modular 🛠️**: Customize Jigsaw by adding new AI models and puzzle pieces. Currently supports 39 models from 6 modalities.

## Getting Started

1. Clone the repository.
```bash
git clone https://github.com/chuanenlin/jigsaw.git
cd jigsaw
```

2. Install frontend dependencies.
- Download [Node.js v18](https://nodejs.org/en/download/) or above.
```bash
cd Frontend
yarn install
```

3. Install backend dependencies.
```bash
cd Backend
pip install -r requirements.txt
```

4. Set up environment variables.
```bash
cp Backend/config/settings_example.py Backend/config/settings_local.py
```
- Replace the placeholder values in `settings_local.py` with your [Replicate](https://replicate.com/account/api-tokens), [AWS](https://aws.amazon.com/), and [OpenAI](https://platform.openai.com/api-keys) keys.

5. Run the development servers.

**Frontend**
```bash
cd Frontend
yarn start
```
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**Backend**
```bash
cd Backend
python -m uvicorn main:app
```
- Open [http://localhost:8000/docs](http://localhost:8000/docs) to view the backend documentation.

6. Enable CORS in your browser.
[https://cors-anywhere.herokuapp.com/corsdemo](https://cors-anywhere.herokuapp.com/corsdemo)

## Editing Puzzle Pieces

**Update puzzle piece data**

- Go to `src/constants/block-list/blockName`.
- Open `blockName.block.ts` file.
  - To change search params, change the fields of `meta.properties`.
  - To change tooltip data, change the fields of `meta` except for `meta.properties`.

**Update puzzle piece parameters**

- Go to `src/constants/block-list/blockName`.
- Open `blockName.params.ts`.
- Modify both the interface and the jsonSchema.

**Add a new puzzle piece**

- Go to `src/constants/block-list`.
- Create a file with a unique `blockName.block.ts` name.
- Create and export an object of type `Block`.
- Create an `index.ts` file and export the `Block` object.
- Navigate to `src/constants/block-list/index.ts`.
- Import the created block object.
- Add the block object to blockList array.

## License

[MIT License](https://opensource.org/license/mit). Feel free to use the code for your own projects.
