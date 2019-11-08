export function rating(i){
return `<i class="fa ${i >= 1 ? 'fa-star yellow' : 'fa-star-o'}"></i>
            <i class="fa ${i >= 2 ? 'fa-star yellow' : 'fa-star-o'}"></i>
            <i class="fa ${i >= 3 ? 'fa-star yellow' : 'fa-star-o'}"></i>
            <i class="fa ${i >= 4 ? 'fa-star yellow' : 'fa-star-o'}"></i>
            <i class="fa ${i >= 5 ? 'fa-star yellow' : 'fa-star-o'}"></i>`
}