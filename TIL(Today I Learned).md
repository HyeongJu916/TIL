# TIL(Today I Learned)

> 알고리즘 문제를 풀고 난 후 그날 알게된 함수들이나 개념들을 정리하는 공간

##### 20.01.15

###### K번째 수

java에서 배열을 자를 때는 copy 함수를 이용

Arrays.copyOfRange(원본 배열, 복사할 시작인덱스, 복사할 끝인덱스)

인덱스는 0부터 시작하는것 기준

###### 약수의 합

![image-20200115151308950](C:\Users\MNWISE\AppData\Roaming\Typora\typora-user-images\image-20200115151308950.png)

n을 1로 나누어도 나머지는 0이 되기 때문에 반복문을 돌릴 때 1부터 돌릴 수 있다.

answer = 1 로 초기화 시키면 입력이 0일 때 옳은 출력이 0인데 1이 출력되므로 잘못된 방법이다.

