interface IMailConfig {
  driver: 'ethereal';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'contact@rogeriotavares.dev',
      name: 'Rogerio Tavares',
    },
  },
} as IMailConfig;
