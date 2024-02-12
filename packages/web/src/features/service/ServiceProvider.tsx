import { createContext, useContext } from 'solid-js';
import { Service } from '@/services/service';
import type { Service as ServiceType } from '@/types/Service';
import type { JSX } from 'solid-js';

type ServiceContextType = {
  service: ServiceType;
};

const ServiceContext = createContext<ServiceContextType>();

export const ServiceProvider = (props: { children: JSX.Element }) => (
  <ServiceContext.Provider value={{ service: Service }}>{props.children}</ServiceContext.Provider>
);

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('Could not find ServiceProvider!');
  }

  return context.service;
};
