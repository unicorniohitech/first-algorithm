// Algoritmo: Topological sorting(DFS)

class Module {
  constructor(name) {
    this.name = name;
    this.dependencies = [];
  }

  addDependencies = (...dependencies) => 
    dependencies.forEach(
      dependency => this.dependencies.push(dependency)
    );

  // Inicializa as variáveis e itera pelos nós não marcados
  static resolve = (...modules) => {
    let loadOrder = [];
    let visitedModules = new Set();

    modules.forEach(module => {
      if (!visitedModules.has(module.name)) {
        Module.resolveHelper(module, visitedModules, loadOrder);
      }
    });

    return loadOrder;
  };

  // DFS (Faz a busca em profundidade, marcando os nós já passados)
  static resolveHelper = (module, visitedModules, stack) => {
    visitedModules.add(module.name);
    module.dependencies.forEach(n => {
      if (!visitedModules.has(n.name)) {
         Module.resolveHelper(n, visitedModules, stack);
      }
   });
   stack.push(module);
  };
}

// Módulos (nós)
const module0 = new Module(0);
const module1 = new Module(1);
const module2 = new Module(2);
const module3 = new Module(3);
const module4 = new Module(4);
const module5 = new Module(5);
const module6 = new Module(6);
const module7 = new Module(7);
// Dependencias (arestas)
module2.addDependencies(module1);
module3.addDependencies(module0);
module5.addDependencies(module3);
module6.addDependencies(module5, module2, module4);
module7.addDependencies(module5, module6);

const loadOrder = Module.resolve(module7, module1, module2, module3, module4, module5, module6, module0);

loadOrder.forEach(module => console.log(module.name));