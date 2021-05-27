type ITypeOrmQuery = {
        where?: {
          [column: string]: any;
        };
        sort?: {
          [column: string]: number;
        };
        page: number;
        perPage: number;
      };

