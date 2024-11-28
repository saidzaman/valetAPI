# valetAPI
## How to run the tests:
1. Clone the repository
2. Go to the folder that you created for this repo and run `npm install`
3. Run `npx cypress run`

## Observation:

1. Noticed that when we enter a decimal for the value for recent weeks - it doesn't crash. It truncates it to integer and outputs the result. This was not included in the test cases.

2. If the number of weeks exceeds a 64 bit Integer then it returns an empty observation array. This was not included in the test cases.

3. HTML Report can be found in the mochawesome-report folder.

4. Used commands.js to write a command for the code reusability.


## Additional steps I would have taken with more time.

1. I can write more positive test cases for all the other currencies.

2. I can add more assertions for response properties to make the test cases even more robust.