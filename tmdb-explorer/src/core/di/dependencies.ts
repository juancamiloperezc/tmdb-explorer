export enum ServiceType { Singleton, Factory };

export interface Singleton <T> {
  type: ServiceType.Singleton,
  instance: T
}

export interface Factory <T> {
  type: ServiceType.Factory,
  factory: () => T
}

class Container {

  private services = new Map<String, any>();

  register<T> (key: string, service: Singleton<T> | Factory<T>) {
    this.services.set(key, service);
  }

  resolve<T> (key: string) : T | null {
    const service = this.services.get(key) || null;
    
    if(service.type === ServiceType.Singleton) return service.instance;
    if(service.type === ServiceType.Factory) return service.factory();

    return null;
  }

}

export const container = new Container();