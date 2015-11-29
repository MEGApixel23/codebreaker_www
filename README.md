# Codebreaker WWW (Web version)

Its a web version of game provided by [Codebreaker gem](https://github.com/MEGApixel23/Codebreaker).

## Demo
https://fast-hamlet-4393.herokuapp.com/

## Rules

Codebreaker is a logic game in which a code-breaker tries to break a secret code created by a code-maker. The code-maker, which will be played by the application we’re going to write, creates a secret code of four numbers between 1 and 6.

The code-breaker then gets some number of chances to break the code. In each turn, the code-breaker makes a guess of four numbers. The code-maker then marks the guess with up to four + and - signs.

A + indicates an exact match: one of the numbers in the guess is the same as one of the numbers in the secret code and in the same position.

A - indicates a number match: one of the numbers in the guess is the same as one of the numbers in the secret code but in a different position.

## Instalation
- run `bundle` in command line
- run `rakeup`
- Visit http://localhost and play the game
