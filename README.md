# projectone

This is an image process api.

Here is an sample URL to test this API:
Method:  GET
URL: http://localhost:5000/api/images?filename=flower6&width=300&height=800

For filename, here are 10 images available:
    flower1
    flower2
    flower3
    flower4
    flower5
    flower6
    flower7
    flower8
    flower9
    qiaoyin

Then a cropped image accroding to requested width and height will be displayed.
If exact same image (with same width and height), a cached imaged will be loaded instead.

1. to run the project:
npm start
2. to build the project:
npm run build
3. to format script with prettier:
npm run prettier-format
4. to lint:
npm run lint
6. to run test:
npm run test
