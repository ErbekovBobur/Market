function expDate(date) {
    let endDate = '';
    endDate += new Date(date).getFullYear();
    endDate += '-' + (new Date(date).getMonth() < 9 ? '0' + (new Date(date).getMonth() + 1) : (new Date(date).getMonth() + 1));
    endDate += '-' + (new Date(date).getDate() < 10 ? ('0' + new Date(date).getDate()) : new Date(date).getDate());
    return endDate;
};

export const ifEditData = (id, data) => {
    const form = document.querySelector('#product_form');
    if (id && form) {
        form.name.value = data[0].name
        form.price.value = data[0].price
        form.url.value = data[0].url
        form.date.value = expDate(data[0].exp_date)
        form.amount.value = data[0].amount
        form.description.value = data[0].description
        form.brend.value = data[0].brend
    }
};