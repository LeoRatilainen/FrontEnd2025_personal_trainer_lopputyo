export type Customer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
        self: {
            href: string;
        },
        customer: {
            href: string;
        },
        training: {
            href: string;
        }
    }
}

export type CustomerForm = Omit<Customer, "_links">;

export type Training = {
    date: string;
    duration: string;
    activity: string;
    customer: string;
    _links: {
        self: {
            href: string;
        },
        customer: {
            href: string;
        },
        training: {
            href: string;
        }
    }
}

export type TrainingForm = Omit<Training, "_links">;