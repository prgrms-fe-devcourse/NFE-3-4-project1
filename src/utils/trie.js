// 문자열을 효율적으로 저장하고 자동완성 기능을 구현하는 클래스입니다.
// 문자열을 노드로 구성된 트리에 삽입하고, 특정 문자열로 시작하는 모든 결과를 찾아 반환합니다.

// 노드 클래스 정의
class Node {
  constructor(value) {
    // value: 노드가 가진 문자열의 누적된 값
    this.value = value;
    // isTarget: 현재 노드가 문자열의 끝인지 여부
    this.isTarget = false;
    // children: 자식 노드들을 객체 형태로 저장
    this.children = {};
  }
}

// Trie 클래스 정의
export class Trie {
  constructor() {
    // 트리의 시작점인 루트 노드를 생성합니다.
    this.root = new Node("");
  }

  // 문자열과 ID를 트리에 삽입하는 함수
  insert(string, id) {
    let currentNode = this.root;

    // 문자열에 - ID: ${id}를 추가해 고유 식별자를 포함시킵니다.
    string += ` - ID: ${id}`;
    string.split("").forEach((char, index) => {
      if (!currentNode.children[char]) {
        // 해당 문자를 키로 하는 자식 노드가 없으면 새 노드를 생성합니다.
        currentNode.children[char] = new Node();
        // currentNode.value에 현재 문자를 추가하여 누적된 값을 저장합니다.
        currentNode.children[char].value = currentNode.value + char;
      }
      // 현재 노드를 자식 노드로 변경합니다.
      currentNode = currentNode.children[char];
      // 마지막 문자의 노드에 도달하면 isTarget을 true로 설정해 유효한 문자열임을 표시합니다.
      if (index === string.length - 1) {
        currentNode.isTarget = true;
      }
    });
  }

  // 자동완성 기능을 제공하는 함수
  autocomplete(string) {
    const result = [];
    // 입력된 문자열이 유효한지 확인합니다.
    if (typeof string !== "string" || !string) {
      result.push(`검색어를 입력해주세요`);
      return result;
    }

    let currentNode = this.root;

    // 입력된 문자열을 트리에서 찾습니다.
    for (const char of string) {
      if (!currentNode.children[char]) {
        result.push(`'${string}'은 예상 검색어에 없습니다.`);
        return result;
      }
      currentNode = currentNode.children[char];
    }

    // BFS를 사용해 자식 노드를 순차적으로 탐색합니다.
    // 현재 노드를 시작점으로 큐(queue)를 사용해 자식 노드를 탐색합니다.
    // isTarget이 true인 노드를 만나면 결과에 추가합니다.
    const queue = [];
    queue.push(currentNode);

    while (queue.length) {
      currentNode = queue.shift();
      if (currentNode.isTarget) {
        result.push(currentNode.value);
      }

      // 현재 노드의 모든 자식 노드를 큐에 추가합니다.
      Object.keys(currentNode.children).forEach((key) => {
        queue.push(currentNode.children[key]);
      });
    }

    return result;
  }
}

// 사용법 예시
const trie = new Trie();
trie.insert("cat", 1);
trie.insert("catch", 2);
trie.insert("can", 3);
trie.insert("cob", 4);
trie.insert("사과", 5);
trie.insert("사과합니다", 6);
trie.insert("사랑해", 7);
trie.insert("사이가", 8);

console.log(trie.autocomplete("cat")); // ['cat - ID: 1', 'catch - ID: 2']
console.log(trie.autocomplete("사")); // ['사과 - ID: 5', '사과합니다 - ID: 6', '사랑해 - ID: 7', '사이가 - ID: 8']
console.log(trie.autocomplete("dog")); // ['dog은 예상 검색어에 없습니다.']
