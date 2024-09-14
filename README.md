# FE interview take-home challenge 1

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Implementation
- dev모드가 아니라 그런지, 피그마에서 정확한 padding값이 보이지 않아서 x, y를 계산해서 대략적으로 padding이나 margin을 적용했습니다.
- 현재 filter 로직에 문제가 있습니다. 제가 생각할 때 react-query를 사용하면서 queryKey를 생각하지 못했던 부분이 현재 코드에서 문제를 발생시킨 것 같습니다.
- description에서는 group에 대한 정보가 없어서 group으로 묶어서 필터링 하지 못했습니다.
- search bar 아이콘을 클릭해서도 필터링 동작하게 하고 싶었지만, 구현하지 못했습니다. 
- input에서 입력 시 debounce를 걸어서 이벤트가 발생하도록 요청주셨는데, debounce를 적용하지 못한 상태입니다.
