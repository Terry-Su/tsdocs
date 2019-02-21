export interface CategoryType {
  id?: string,
  label: string,
  href?: string
  items?: CategoryType[]
  foldable?: boolean,
  allFolded?: boolean
  folded?: boolean
}