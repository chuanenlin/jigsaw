# modmod-frontend

## To run the project locally

### Requirements

- Node.js v18 or above. [download from here](https://nodejs.org/en/download/)
- Yarn v1 - install after Node.js using the command `npm install --global yarn`

### Steps

- run `yarn install` to install all dependencies
- run `yarn start` to start the project
- go to `http://localhost:3000` to view the project

## To update data

### Update block data

- go to `src/constants/block-list/blockName`
- open `blockName.block.ts` file
  - to change search params change the fields of `meta.properties`
  - to change tooltip data change the fields of `meta` except for `meta.properties`

### Update block parameters

- go to `src/constants/block-list/blockName`
- open `blockName.params.ts`
- modify both the interface and the jsonSchema

### To add a new block

- go to `src/constants/block-list`

- create a file with a unique `blockName.block.ts` name
- create and export an object of type `Block`
- create an `index.ts` file and export the `Block` object
- navigate to `src/constants/block-list/index.ts`
- import the created block object
- add the block object to blockList array
