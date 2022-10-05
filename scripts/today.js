const fs = require('fs').promises;
const dayjs = require('dayjs')

const body = `---
title: "no title"
date: "${dayjs().format("YYYYMMDD")}"
tags: ["diary"]
---
`;

const todayDir = `content/${dayjs().format("YYYY-MM-DD")}`;
(async () => {
    try {
        await fs.mkdir(todayDir)
        await fs.writeFile(`${todayDir}/index.md`, body);
        console.log('today file created');
    } catch(error) {
        console.log(`script failed. \n${error}`);
    }
})();